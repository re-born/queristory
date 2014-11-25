class TeamsController < ApplicationController

  def index
    render json: Team.all.map(&:name)
  end

  def show
    if @team = Team.find_by(name: params[:id])
      @queries = @team.queries.page(params[:page]).per(25)
    else
      render nothing: true, status: 404
    end
  end
end
