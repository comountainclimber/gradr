class Api::StudentsController < ApplicationController
  def index
    studentsArr = [
      {
        name: "Sally Jenkins",
        grade: 66
      },
      {
        name: "Bill Gates",
        grade: 100
      },
      {
        name: "Sammy Diamond Dream",
        grade: 64
      },
      {
        name: "Maxwell Lasky",
        grade: 98
      },
      {
        name: "Matt Kabak",
        grade: 83
      },
      {
        name: "Alex Hoffman",
        grade: 40
      },
      {
        name: "Abe Lincoln",
        grade: 105
      }
    ]
    render :json => studentsArr
  end
end
