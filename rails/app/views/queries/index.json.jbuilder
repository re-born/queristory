json.array!(@queries) do |query|
  json.extract! query, :id, :query, :user_id, :deleted_at
  json.url query_url(query, format: :json)
end
