class UsersController < ApplicationController
  skip_before_action :authorize_request, only: [:create]

  # POST /signup
  def create
    user = User.new(user_params)
    if user.save
      # token = JwtHelper.encode(user_id: user.id)
      render json: {user: user,success:true}, status: :created
    else
      render json: { errors: user.errors.full_messages,success: false }, status: :unprocessable_entity
    end
  end

  # GET /me
  def me
    render json: current_user
  end

  # PUT /update
def update
  if params[:password].present?
    # Verify the password
    unless current_user.authenticate(params[:password])
      return render json: { errors: ['Incorrect password'] }, status: :unauthorized
    end
  else
    return render json: { errors: ['Password is required for update'] }, status: :unprocessable_entity
  end

  if current_user.update(update_params)
    render json: { result: true, user: current_user }
  else
    render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
  end
end

  private

  def user_params
    params.permit(:email, :password, :password_confirmation, :first_name, :last_name,:name)
  end

  def update_params
    params.permit(:name, :password, :password_confirmation)
  end
end
