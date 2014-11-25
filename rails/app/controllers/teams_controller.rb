class TeamsController < ApplicationController
  def show
    @team = Team.find_by(name: params[:id])
    @queries = @team.queries.page(params[:page]).per(25)
  end
end
