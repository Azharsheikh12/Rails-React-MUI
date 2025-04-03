module Api
    module V1
      class UsersController < Api::BaseController
        before_action :authenticate_user!
  
        def profile
          render json: current_user, status: :ok
        end
      end
    end
  end
  