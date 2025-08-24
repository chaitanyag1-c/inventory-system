# app/helpers/jwt_helper.rb
module JwtHelper
  SECRET_KEY =  "d246a9efc3e48913ad4e3419071a0dd61c2902d100ee8f2f1658851c224dff4ddd28509ee3e0c264dbf15307e5d1ef9c6b20a5a8a76b05b1ca6667ad39c0d084"

  def self.decode(token)
puts "secret key *****************************"
  	puts SECRET_KEY
    decoded = JWT.decode(token, SECRET_KEY)[0]
    HashWithIndifferentAccess.new(decoded)
  rescue JWT::DecodeError => e
    nil
  end
end
