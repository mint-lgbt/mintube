require "test_helper"

class LicenseControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get license_index_url
    assert_response :success
  end
end
