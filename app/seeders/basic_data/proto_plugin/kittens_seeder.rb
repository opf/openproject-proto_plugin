module BasicData
  module ProtoPlugin
    ##
    # Seeders defined under `BasicData::<PluginNameSpace>` get discovered by the core
    # automatically.
    class KittensSeeder < ::Seeder
      ##
      # The Seeder's main method called during `rake db:seed`.
      def seed_data!
        Kitten.transaction do
          kitten_names.each do |name|
            Kitten.create name: name
          end
        end
      end

      ##
      # Don't run the seed if this method returns false to prevent seeding
      # over already existing data.
      #
      # Overrides the default (`true`) in its base class `Seeder`.
      def applicable?
        Kitten.count == 0
      end

      ##
      # Message shown during `rake db:seed` as an explanation why this Seeder was skipped.
      #
      # Overrides the default message in its base class `Seeder`.
      def not_applicable_message
        'No need to seed kittens as there already are some.'
      end

      def kitten_names
        %w(Klaus Herbert Felix)
      end
    end
  end
end
