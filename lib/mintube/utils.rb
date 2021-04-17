module MinTube
  class Utils
    class YoutubeConnectionPool
      property :url, URI
      property :capacity, Int32
      property :timeout, Float64
    end

    private

    def add_yt_headers(request)
      request.headers["user-agent"] ||= "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
      request.headers["accept-charset"] ||= "ISO-8859-1,utf-8;q=0.7,*;q=0.7"
      request.headers["accept"] ||= "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      request.headers["accept-language"] ||= "en-us,en;q=0.5"
      return if request.resource.starts_with? "/sorry/index"
      request.headers["x-youtube-client-name"] ||= "1"
      request.headers["x-youtube-client-version"] ||= "2.20200609"
      # Preserve original cookies and add new YT consent cookie for EU servers
      request.headers["cookie"] = "#{request.headers["cookie"]?}; CONSENT=YES+"
    end
  end
end
