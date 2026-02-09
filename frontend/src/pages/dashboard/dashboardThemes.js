export const dashboardThemes = {
  padrao: {
    name: 'dashStyles.default',
    colors: {
      primary: 'var(--q-primary)',
      secondary: 'var(--q-secondary)',
      accent: 'var(--q-accent)',
      positive: 'var(--q-positive)',
      negative: 'var(--q-negative)',
      warning: 'var(--q-warning)',
      light: 'var(--q-light)',
      dark: 'var(--q-dark)',
    },
    chartOptions: {
      palette: 'palette1',
      mode: 'light',
      fillType: 'gradient',
      monochrome: {
        enabled: true,
        color: 'var(--q-primary)',
        shadeTo: 'light',
        shadeIntensity: 0.95
      }
    }
  },
  classico: {
    name: 'dashStyles.classic',
    colors: {
      primary: '#4361ee',
      secondary: '#f8f9fa',
      accent: '#3a0ca3',
      positive: '#2ecc71',
      negative: '#e74c3c',
      warning: '#f1c40f',
      light: '#4cc9f0',
      dark: '#212529',
    },
    chartOptions: {
      palette: 'palette1',
      mode: 'light',
      fillType: 'gradient',
    }
  },
  moderno: {
    name: 'dashStyles.modern',
    colors: {
      primary: '#ff5722',
      secondary: '#fff',
      accent: '#00bcd4',
      positive: '#4caf50',
      negative: '#f44336',
      warning: '#ffc107',
      light: '#e1f5fe',
      dark: '#263238',
    },
    chartOptions: {
      palette: 'palette2',
      mode: 'light',
      fillType: 'solid',
    }
  },
  naturaleza: {
    name: 'dashStyles.nature',
    colors: {
      primary: '#2d5a27',
      secondary: '#f5f5f5',
      accent: '#8bc34a',
      positive: '#4caf50',
      negative: '#f44336',
      warning: '#ff9800',
      light: '#e8f5e8',
      dark: '#1b5e20',
    },
    chartOptions: {
      palette: 'palette3',
      mode: 'light',
      fillType: 'gradient',
    }
  },
  elegante: {
    name: 'dashStyles.elegant',
    colors: {
      primary: '#9c27b0',
      secondary: '#fafafa',
      accent: '#e91e63',
      positive: '#4caf50',
      negative: '#f44336',
      warning: '#ff9800',
      light: '#f3e5f5',
      dark: '#4a148c',
    },
    chartOptions: {
      palette: 'palette5',
      mode: 'light',
      fillType: 'solid',
    }
  },
  vibrante: {
    name: 'dashStyles.vibrant',
    colors: {
      primary: '#ff6b35',
      secondary: '#ffffff',
      accent: '#7209b7',
      positive: '#06ffa5',
      negative: '#ff006e',
      warning: '#ffbe0b',
      light: '#fff8e1',
      dark: '#d84315',
    },
    chartOptions: {
      palette: 'palette6',
      mode: 'light',
      fillType: 'gradient',
    }
  },
  minimalista: {
    name: 'dashStyles.minimalist',
    colors: {
      primary: '#607d8b',
      secondary: '#fafafa',
      accent: '#455a64',
      positive: '#66bb6a',
      negative: '#ef5350',
      warning: '#ffa726',
      light: '#eceff1',
      dark: '#37474f',
    },
    chartOptions: {
      palette: 'palette7',
      mode: 'light',
      fillType: 'solid',
    }
  },
  corporativo: {
    name: 'dashStyles.corporative',
    colors: {
      primary: '#1976d2',
      secondary: '#f5f5f5',
      accent: '#0d47a1',
      positive: '#388e3c',
      negative: '#d32f2f',
      warning: '#f57c00',
      light: '#e3f2fd',
      dark: '#0d47a1',
    },
    chartOptions: {
      palette: 'palette8',
      mode: 'light',
      fillType: 'gradient',
    }
  },
} 