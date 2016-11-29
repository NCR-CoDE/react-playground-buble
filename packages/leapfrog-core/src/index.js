// @flow


// export Button from 'button'
// export TextInput from 'TextInput'
// export Checkbox from 'checkbox'

// export Spacer from './components/spacer'

import fallback from './utils/fallback'
export Caret from './components/caret'
export PageHeader from './components/page-header'
export Button from './components/button'
export Toast from './components/toasts/toast'
export Toasts from './components/toasts/toasts'
export WithToasts from './components/toasts/with-toasts'
export TextInput from './components/text-input'
export MultiselectDropdown from './components/dropdowns/multiselect-dropdown'
export Loader from './components/loader'
export Spacer from './components/spacer'
export Checkbox from './components/checkbox'
export Radio from './components/radio'
export Modal from './components/modal'
export ModalTitle from './components/modal-title'
import ToggleSwitchMain from './components/toggle-switch'
import ToggleSwitchIe9 from './components/toggle-switch.ie9'
export const ToggleSwitch = fallback(ToggleSwitchMain, ToggleSwitchIe9)
