module ApplicationHelper
  GOOGLE_SEARCH_URL = 'http://google.com/search'

  def url_for_search(query, option)
    url = "#{GOOGLE_SEARCH_URL}?q=#{query.q}"

    if option
      url += "&#{option}=#{query[option]}"
    end
    "#{url}&queristory_from=#{query.id}"
  end
end
