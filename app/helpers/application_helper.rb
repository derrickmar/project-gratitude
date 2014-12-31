module ApplicationHelper
	def yield_content!(content_key)
		view_flow.content.delete(content_key)
	end
end
