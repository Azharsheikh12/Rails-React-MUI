module Api
  module V1
    class SessionsController < Api::BaseController
      skip_before_action :authenticate_user!, only: [:create]

      def create
        # Handle both JSON and form submission
        user_params = params[:user] || params[:session]

        # Validate the presence of params
        unless user_params && user_params[:email] && user_params[:password]
          render json: { errors: "Email and password are required" }, status: :unprocessable_entity and return
        end

        # Find the user by email
        user = User.find_by(email: user_params[:email])

        if user&.valid_password?(user_params[:password])
          render json: { message: 'Login successful', token: user.jwt_token }, status: :ok
        else
          render json: { errors: 'Invalid email or password' }, status: :unauthorized
        end
      end
    end
  end
end
