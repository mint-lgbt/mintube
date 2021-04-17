module ApplicationHelper
  def current_version
    `git log -1 --format=%ci | awk '{print $1}' | sed s/-/./g`.strip
  end

  def current_commit
    `git rev-list HEAD --max-count=1 --abbrev-commit`.strip
  end

  def current_branch
    `git branch | sed -n '/* /s///p'`.strip
  end
end
