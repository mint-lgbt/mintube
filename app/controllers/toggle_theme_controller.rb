class ToggleThemeController < ApplicationController
  def change
    if session[:dark_mode] == "dark"
      session[:dark_mode] = "light"
    else
      session[:dark_mode] = "dark"
    end

    redirect_to :root
  end
end
