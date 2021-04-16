# MinTube

A rewrite of Invidious using Ruby on Rails.

## Why?

The main reason we are even doing this is because [mint.lgbt](https://mint.lgbt)'s Invidious instance kept failing and crashing our database, halting all our other services in the process.

We really think Invidious is great, it's just too bloated with bugs for us to use in production.

## Ok, but why use Ruby on Rails?

[Luna](https://luna.mint.lgbt) was the one who started this project, and she is most comfortable working in a Rails environment. Plus, Rails has been tested in battle thousands of times, so we don't need to worry too much about bloat.

## What are the key differences between this and Invidious?

Well,

1. This uses Ruby on Rails instead of Kemal

2. This requires the use of JS

3. We don't support Anti-Captcha, for various ethical reasons

We hope that these differneces don't become too big of a turn-off for users.

## What is this licensed under?

The [AGPL-3.0](LICENSE), the same license used by Invidious.
