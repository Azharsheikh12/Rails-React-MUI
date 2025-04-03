class ReferralMailer < ApplicationMailer
    def invite(email, referrer)
      @referrer = referrer
      mail(to: email, subject: "You've been invited to join our platform!")
    end
  end
  