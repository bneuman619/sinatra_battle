module GridView

  LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
  NUMBERS_ROW = "       1    2    3    4    5    6    7    8    9    10<br>"
  BETWEEN_ROWS = "     " + "-" * 49 + "<br>"

  def self.render(coords)
    coord_parser = self.parse_coord
    (1..10).reduce(NUMBERS_ROW + BETWEEN_ROWS) do |grid, row_num|
      row_coords = self.get_row_coords(row_num)
      grid += self.get_row_letter(row_num) + self.make_row(coords, row_coords, &coord_parser) + BETWEEN_ROWS
    end
  end

  def self.make_row(board, row_coords)
    string = row_coords.reduce("") do |string, coord|
      point_value = board[coord]
      string += yield(point_value)
      string += "|  "
    end

    string += "<br>"
  end

  def self.get_row_letter(row_num)
    "#{LETTERS[row_num - 1]}      "
  end

  def self.get_row_coords(row_num)
    starting_coord = (row_num - 1) * 10
    (starting_coord..starting_coord + 9).to_a
  end

  def self.parse_coord
    Proc.new do |coord|
      unless coord.nil?
        coord
      else
        "NNN"
      end
    end
  end
end
  