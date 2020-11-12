class NotesController < ApplicationController
   
    def create
        note = Note.new
        note.trail = Trail.find(params["trail_id"])
    end

    

end
