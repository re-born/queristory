class QueriesController < ApplicationController
  before_action :set_query, only: [:show, :edit, :update, :destroy]

  # GET /queries
  # GET /queries.json
  def index
    @queries = Query.all
  end

  # GET /queries/1
  # GET /queries/1.json
  def show
  end

  # GET /queries/new
  def new
    @query = Query.new
  end

  # GET /queries/1/edit
  def edit
  end

  # POST /queries
  # POST /queries.json
  def create
    @query = Query.new({query: params['?q']})
    # respond_to do |format|
      if @query.save
        render nothing: true
        tweet(params['?q'])
        # format.json { render action: 'show', status: :created, location: @query }
      else
        # format.json { render json: @query.errors, status: :unprocessable_entity }
      end
    # end
  end

  # PATCH/PUT /queries/1
  # PATCH/PUT /queries/1.json
  # def update
  #   respond_to do |format|
  #     if @query.update(query_params)
  #       format.json { head :no_content }
  #     else
  #       format.json { render json: @query.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # DELETE /queries/1
  # DELETE /queries/1.json
  def destroy
    @query.destroy
    # respond_to do |format|
      # format.html { redirect_to queries_url }
      # format.json { head :no_content }
    # end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_query
      @query = Query.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def query_params
      params.require(:query).permit(:query, :user_id, :deleted_at)
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
