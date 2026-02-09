// Ensure libraries expecting a global `Lame` can find it
import * as lamejs from '@breezystack/lamejs'

if (typeof window !== 'undefined') {
  window.Lame = window.Lame || lamejs
  // Some legacy libs expect a global `Presets`; provide a harmless fallback
  if (typeof window.Presets === 'undefined') {
    window.Presets = {}
  }
  if (typeof window.QuantizePVT === 'undefined') {
    window.QuantizePVT = {
      Q_MAX: 256 + 1,
      Q_MAX2: 116,
      LARGE_BITS: 100000,
      IXMAX_VAL: 8206
    }
  }
  // Provide minimal stubs for legacy classes referenced by old mic/mp3 libs
  window.Quantize = window.Quantize || {}
  window.Takehiro = window.Takehiro || {}
  window.VBRQuantize = window.VBRQuantize || {}
  window.BitStream = window.BitStream || {}
  window.VBRTag = window.VBRTag || {}
  window.Version = window.Version || {}
  // Additional classes referenced by legacy lamejs bundles
  window.Reservoir = window.Reservoir || {}
  window.PsyModel = window.PsyModel || {}
  window.NewMDCT = window.NewMDCT || {}
  window.Tables = window.Tables || {}
  window.III_psy_xmin = window.III_psy_xmin || {}
  window.III_psy_ratio = window.III_psy_ratio || {}
  window.FFT = window.FFT || {}
  window.L3Side = window.L3Side || {}
  window.IIISideInfo = window.IIISideInfo || {}
  window.GrInfo = window.GrInfo || {}
  window.ATH = window.ATH || {}
  window.MeanBits = window.MeanBits || {}
  window.VBRSeekInfo = window.VBRSeekInfo || {}
  window.ScaleFac = window.ScaleFac || {}
  window.Encoder = window.Encoder || {}
  window.Lame = window.Lame || window.Lame // keep existing
  // MPEG mode enum expected by some lamejs builds
  if (typeof window.MPEGMode === 'undefined') {
    window.MPEGMode = {
      STEREO: 0,
      JOINT_STEREO: 1,
      DUAL_CHANNEL: 2,
      MONO: 3
    }
  }
  // Some builds reference `GainAnalysis` constants directly
  if (typeof window.GainAnalysis === 'undefined') {
    window.GainAnalysis = {
      GAIN_NOT_ENOUGH_SAMPLES: -24601,
      GAIN_ANALYSIS_ERROR: 0,
      GAIN_ANALYSIS_OK: 1,
      INIT_GAIN_ANALYSIS_ERROR: 0,
      INIT_GAIN_ANALYSIS_OK: 1
    }
  }
}
if (typeof globalThis !== 'undefined') {
  globalThis.Lame = globalThis.Lame || lamejs
  if (typeof globalThis.Presets === 'undefined') {
    globalThis.Presets = {}
  }
  if (typeof globalThis.QuantizePVT === 'undefined') {
    globalThis.QuantizePVT = {
      Q_MAX: 256 + 1,
      Q_MAX2: 116,
      LARGE_BITS: 100000,
      IXMAX_VAL: 8206
    }
  }
  globalThis.Quantize = globalThis.Quantize || {}
  globalThis.Takehiro = globalThis.Takehiro || {}
  globalThis.VBRQuantize = globalThis.VBRQuantize || {}
  globalThis.BitStream = globalThis.BitStream || {}
  globalThis.VBRTag = globalThis.VBRTag || {}
  globalThis.Version = globalThis.Version || {}
  globalThis.Reservoir = globalThis.Reservoir || {}
  globalThis.PsyModel = globalThis.PsyModel || {}
  globalThis.NewMDCT = globalThis.NewMDCT || {}
  globalThis.Tables = globalThis.Tables || {}
  globalThis.III_psy_xmin = globalThis.III_psy_xmin || {}
  globalThis.III_psy_ratio = globalThis.III_psy_ratio || {}
  globalThis.FFT = globalThis.FFT || {}
  globalThis.L3Side = globalThis.L3Side || {}
  globalThis.IIISideInfo = globalThis.IIISideInfo || {}
  globalThis.GrInfo = globalThis.GrInfo || {}
  globalThis.ATH = globalThis.ATH || {}
  globalThis.MeanBits = globalThis.MeanBits || {}
  globalThis.VBRSeekInfo = globalThis.VBRSeekInfo || {}
  globalThis.ScaleFac = globalThis.ScaleFac || {}
  globalThis.Encoder = globalThis.Encoder || {}
  globalThis.Lame = globalThis.Lame || globalThis.Lame
  if (typeof globalThis.MPEGMode === 'undefined') {
    globalThis.MPEGMode = {
      STEREO: 0,
      JOINT_STEREO: 1,
      DUAL_CHANNEL: 2,
      MONO: 3
    }
  }
  if (typeof globalThis.GainAnalysis === 'undefined') {
    globalThis.GainAnalysis = {
      GAIN_NOT_ENOUGH_SAMPLES: -24601,
      GAIN_ANALYSIS_ERROR: 0,
      GAIN_ANALYSIS_OK: 1,
      INIT_GAIN_ANALYSIS_ERROR: 0,
      INIT_GAIN_ANALYSIS_OK: 1
    }
  }
}

export default () => {}
