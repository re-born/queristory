class TeamsController < ApplicationController

  def index
    render json: Team.pluck(:name)
  end

  def show
    if @team = Team.find_by(name: params[:id])
      @queries = @team.queries.page(params[:page]).per(25)
    else
      render nothing: true, status: 404
    end
  end

  def auth
    team = Team.find_by(name: team_params[:team_name])
    if team && team.authenticate(team_params[:team_password])
      render json: true
    else
      render json: false
    end
  end

  private
    def team_params
      params.permit(:team_name, :team_password)
    end
end
