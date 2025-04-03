module Api
    class BaseController < ActionController::API
      include Devise::Controllers::Helpers
  
      before_action :authenticate_user!, unless: :devise_controller?
  
      rescue_from ActiveRecord::RecordNotFound, with: :not_found
      rescue_from JWT::DecodeError, with: :unauthorized
      private
  
      def not_found
        render json: { error: 'Resource not found' }, status: :not_found
      end
  
      def unauthorized
        render json: { error: 'Not authorized' }, status: :unauthorized
      end
    end
  end
  