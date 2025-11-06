const Aeronave = require("../models/Aeronave");

const aeronaveResolver = {
   Query: {
      aeronaves() {
         return Aeronave.find();
      },
      aeronave(_, { id }) {
         return Aeronave.findById(id);
      },
   },
   Mutation: {
      async createAeronave(_, { aeronave }) {
         try {
            const newAeronave = new Aeronave(aeronave);
            const savedAeronave = await newAeronave.save();
            console.log('Aeronave created:', savedAeronave.id);
            return savedAeronave;
         } catch (error) {
            console.error('Error creating aeronave:', error);
            throw new Error(`Failed to create aeronave: ${error.message}`);
         }
      },
      async updateAeronave(_, { id, aeronave }) {
         try {
            const updatedAeronave = await Aeronave.findByIdAndUpdate(
               id, 
               aeronave, 
               {
                  new: true,
                  runValidators: true,
               }
            );
            if (!updatedAeronave) {
               throw new Error(`Aeronave with id ${id} not found`);
            }
            console.log('Aeronave updated:', id);
            return updatedAeronave;
         } catch (error) {
            console.error('Error updating aeronave:', error);
            throw new Error(`Failed to update aeronave: ${error.message}`);
         }
      },
      async deleteAeronave(_, { id }) {
         try {
            const deletedAeronave = await Aeronave.findByIdAndDelete(id);
            if (!deletedAeronave) {
               throw new Error(`Aeronave with id ${id} not found`);
            }
            console.log('Aeronave deleted:', id);
            return deletedAeronave;
         } catch (error) {
            console.error('Error deleting aeronave:', error);
            throw new Error(`Failed to delete aeronave: ${error.message}`);
         }
      },
   },
};
module.exports = aeronaveResolver;
