require 'open-uri'

namespace :get_trends do
  desc 'crawl from google'
  task :crawl_from_google do
    html_doc = Nokogiri::HTML(open('http://www.google.co.jp/trends/hottrends/atom/hourly').read)
    puts html_doc.css('feed entry content li a').map(&:text)
  end

  desc 'trends from twitter'
  task get_twitter_trends: :environment do
    team = Team.find_by_name('sakai_lab')
    client = Twitter::REST::Client.new do |config|
      config.consumer_key       = team.twitter_consumer_key
      config.consumer_secret    = team.twitter_consumer_secret
      config.access_token        = team.twitter_oauth_key
      config.access_token_secret = team.twitter_oauth_secret
    end

    availables = client.trends_available
    japan_id = availables.find{ |a| a.name == 'Japan' }.id
    puts client.trends(japan_id).map(&:name)
  end
end

