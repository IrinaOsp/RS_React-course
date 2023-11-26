import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';

describe('404', () => {
  it('renders correctly for unknown query', async () => {
    mockRouter.push('/test/test');
    render(<div>404</div>);
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
