class PagesController < ApplicationController

  def create
    @page = Page.new(page_params)
    query_id = Query.find_by({
      q: @page.q,
      session_id: @page.session_id,
    }).id
    @page.update({query_id: query_id})
    if @page.save
      render nothing: true
    else
    end
  end

  private
    def page_params
      params.permit(:url, :title, :q, :rank, :start, :session_id)
    end
end
