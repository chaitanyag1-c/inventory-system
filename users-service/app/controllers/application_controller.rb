class ApplicationController < ActionController::API
  before_action :authorize_request

  attr_reader :current_user

  private

def authorize_request
  header = request.headers['Authorization']
  return render json: { errors: ['Unauthorized'] }, status: :unauthorized if header.blank?
  header = header.split(' ').last
  begin
    decoded = JwtHelper.decode(header)
    @current_user = User.find(decoded[:user_id])
  rescue ActiveRecord::RecordNotFound, JWT::DecodeError
    render json: { errors: ['Unauthorized'] }, status: :unauthorized
  end
end


end
