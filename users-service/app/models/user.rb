class User < ApplicationRecord
    has_secure_password
    validates :email, presence: true, uniqueness: true
    validates :first_name, presence:true
    before_create :generate_full_name

    private
    def generate_full_name
        self.name = self.first_name.to_s + ' '  + self.last_name.to_s
    end
end
