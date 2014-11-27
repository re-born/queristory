class QueriesController < ApplicationController
  def index
    Rails.logger.level = Logger::ERROR
    queries_with_pages = Query.preload(:pages)
    @queries = queries_with_pages.page(params[:page]).per(25)
  end

  def create
    team = Team.find_by(name: team_params[:team_name])
    if team && team.authenticate(team_params[:team_password])
      @query = Query.new(query_with_team_id(team))
      latest_query = Query.first
      if @query.save
        unless latest_query.q == @query.q && latest_query.tbm == @query.tbm
          html = ( render partial: 'queries/query', locals: {query: @query} ).first
          WebsocketRails[team.name.to_sym].trigger 'query', html
          head :ok

          if team.twitter_enabled?
            tweet(format_for_tweet(@query), team)
          end
        else
          render nothing: true
        end
      else
        render nothing: true
      end
    end
  end

  private

    def query_params
      params.permit(:q, :oq, :tbm, :as_qdr, :lr, :tbs, :source, :safe, :num, :filter, :pws, :session_id, :queristory_from)
    end

    def team_params
      params.permit(:team_name, :team_password)
    end

    def query_with_team_id(team)
      query_hash = query_params.dup
      query_hash[:team_id] = team.id
      query_hash
    end

    def format_for_tweet(query)
      bitly = Bitly.new(ENV['bitly_legacy_login'], ENV['bitly_legacy_api_key'])
      url = "http://google.co.jp/search?q=#{query.q}&queristory_from=#{query.id}"
      url += '&tbm=isch' if query.search_image?
      tweet_content = "#{query.q.truncate(100)} #{bitly.shorten(url).short_url}"
      tweet_content += ' [画像検索]' if query.search_image?
      tweet_content
    end

    def tweet(tweet_content, team)
      require 'twitter'
      client = Twitter::REST::Client.new do |config|
        config.consumer_key       = team.twitter_consumer_key
        config.consumer_secret    = team.twitter_consumer_secret
        config.access_token        = team.twitter_oauth_key
        config.access_token_secret = team.twitter_oauth_secret
      end

      tweet_content = (tweet_content.length > 140) ? tweet_content[0..139].to_s : tweet_content

      begin
        client.update(tweet_content)
      rescue Exception => e
        p e
      end
    end
end
