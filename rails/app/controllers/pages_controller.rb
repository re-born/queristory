class PagesController < ApplicationController

  def create
    team = Team.find_by(name: team_params[:team_name])
    if team && team.authenticate(team_params[:team_password])
      @page = Page.new(page_params)
      query_id = Query.find_by({
        q: @page.q,
        session_id: @page.session_id,
      }).id
      @page.update({query_id: query_id})

      if @page.save
        html = ( render partial: 'pages/page', locals: {page: @page} ).first

        WebsocketRails[team.name.to_sym].trigger 'page', { html: html, query_id: query_id}
        head :ok
      end
    end
  end

  private
    def page_params
      params.permit(:url, :title, :q, :rank, :start, :session_id)
    end

    def team_params
      params.permit(:team_name, :team_password)
    end
end
