import { FLEXLIST_API_URL } from '../constants/constants'
import { getPageKey } from '../utils/scopedVariables'

export async function getProductWorkflow(): Promise<void> {
  // TODO: resolve global constants
  // TODO: resolve global variables; session variables should be gotten here in one server call

  if (FLEXLIST_API_URL === '555' && getPageKey('productId') === '555') {
  }
}
