class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  protect_from_forgery with: :null_session
  before_filter :profile_for_admins

  def profile_for_admins
    if Rails.env.development? || current_user.try(:staff?)
      Rack::MiniProfiler.authorize_request
    end
  end
end
