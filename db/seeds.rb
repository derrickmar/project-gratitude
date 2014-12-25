# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

(1..60).each do |n|
	description = n.to_s + ": This is a seed note to test infinite scrolling"
	Note.create({ desc: description })
end