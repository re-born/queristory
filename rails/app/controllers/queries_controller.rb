class QueriesController < ApplicationController
  def index
    Rails.logger.level = Logger::ERROR
    queries_with_pages = Query.preload(:pages)
    @queries = queries_with_pages.page(params[:page]).per(25)
  end

  def create
    @query = Query.new(query_params)
      if @query.save
        render nothing: true
        bitly = Bitly.new(ENV['bitly_legacy_login'], ENV['bitly_legacy_api_key'])
        url = "http://google.co.jp/search?q=#{@query.q}&queristory_from=#{@query.id}"
        tweet "#{@query.q.truncate(110)} #{bitly.shorten(url).short_url}"
      else
      end
  end

  private

    def query_params
      params.permit(:q, :oq, :tbm, :as_qdr, :lr, :tbs, :source, :safe, :num, :filter, :pws, :session_id, :queristory_from)
    end

    def tweet(tweet_content)
      require 'twitter'
      client = Twitter::REST::Client.new do |config|
        config.consumer_key       = ENV['consumer_key']
        config.consumer_secret    = ENV['consumer_secret']
        config.access_token        = ENV['oauth_token']
        config.access_token_secret = ENV['oauth_token_secret']
      end
      tweet_content = (tweet_content.length > 140) ? tweet_content[0..139].to_s : tweet_content
      begin
        client.update(tweet_content)
      rescue Exception => e
        p e
      end
    end
end
