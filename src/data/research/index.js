/**
 * Research index — maps topic names to their research modules.
 * Import each region's research as it is completed.
 */
import { alsaceResearch } from './alsace'

const research = {
  Alsace: alsaceResearch,
}

export function getResearch(topicName) {
  return research[topicName] || null
}

export default research
