class PagesController < ApplicationController

  def create
    @page = Page.new(page_params)
      if @page.save
        render nothing: true
      else
      end
  end

  private
    def page_params
      params.permit(:url, :q, :rank, :start, :session_id)
    end
end
