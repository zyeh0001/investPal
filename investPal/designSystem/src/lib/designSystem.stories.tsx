import type { Meta, StoryObj } from '@storybook/react-vite';
import { InvestPalDesignSystem  } from './designSystem';
import { expect } from 'storybook/test';

const meta = {
  component: InvestPalDesignSystem,
  title: 'InvestPalDesignSystem',
} satisfies Meta<typeof InvestPalDesignSystem>;
export default meta;

type Story = StoryObj<typeof InvestPalDesignSystem>;

export const Primary = {
  args: {
  },
} satisfies Story;

export const Heading = {
  args: {
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/InvestPalDesignSystem/gi)).toBeTruthy();
  },
} satisfies Story;

