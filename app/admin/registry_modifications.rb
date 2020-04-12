ActiveAdmin.register RegistryModification do
  menu priority: 22
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end


#  form do |f|
#    f.inputs do
#      f.input :company
#      f.input :motive, as: :select, collection: RegistryModification.motive.options
#      f.input :modification_date, as: :datepicker
#      f.input :comment, as: :text
#    end
#    f.actions
#  end
form partial: 'main_form', title: 'Registrar Nueva Orden'
  controller do
    def build_new_resource
      if action_name == 'create'
        result = ProcessOrder.for(op: params[:order].permit!.to_h, order: nil)
        order = result[:order]
        @error_message = result[:errors_msg]
        return order
      end
      if action_name == 'new'
        modif = super
        modif.company = Company.take
        return modif
      end
      super
    end
  end

end
