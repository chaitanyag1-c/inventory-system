class ApplicationController < ActionController::API
  before_action :authenticate_user

  private

  def authenticate_user
    header = request.headers['Authorization']
    token = header.split(' ').last if header.present?
    payload = JwtHelper.decode(token)
    if payload
      @current_user_id = payload['user_id'] # or whatever you put in the payload
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end
