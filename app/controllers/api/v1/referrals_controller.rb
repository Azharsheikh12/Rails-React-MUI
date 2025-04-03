module Api
  module V1
    class ReferralsController < Api::BaseController
      before_action :authenticate_user!

      def create
        ReferralMailer.invite(params[:email], current_user).deliver_now
        render json: { message: 'Referral sent successfully!' }, status: :ok
      rescue StandardError => e
        render json: { error: e.message }, status: :unprocessable_entity
      end
    end
  end
end
