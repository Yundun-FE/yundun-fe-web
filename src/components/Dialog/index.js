import Dialog from './Dialog'
import DialogForm from './DialogForm'
import Modal from './Modal'
import ModalForm from './ModalForm'

Dialog.install = Vue => {
  Vue.component(Dialog.name, Dialog)
  Vue.component(DialogForm.name, DialogForm)
  Vue.component(Modal.name, Modal)
  Vue.component(ModalForm.name, ModalForm)
}

export default Dialog
