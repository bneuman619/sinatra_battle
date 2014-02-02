get '/' do
  session[:player1_id] = 1
  session[:player2_id] = 2
  erb :index
end

get '/defense_board' do
  player = Player.first
  defense_board = player.defense_board
  defense_board.to_json
end

post '/shoot' do
  shot_coord = params[:coord][1..-1].to_i
  puts "shot_coord #{shot_coord}"
  defense = Player.find(session[:player2_id])
  defense.coords.each do |coord|
    puts coord.coord
    return "1" if shot_coord == coord.coord.to_i
  end

  return "0"
end

get '/player1' do
  session[:user_id] = 1
end

get '/player2' do
  session[:user_id] = 2
end

get '/opponent_shoot' do
  player = Player.find(session[:user_id])
  opponent = Game.find()

