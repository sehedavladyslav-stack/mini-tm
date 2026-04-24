import { describe, expect, it } from 'vitest';
import { INITIAL_TASK_QUERY_PARAMS } from './task-query.store';
import {
  createTaskQuerySearchParams,
  isSameTaskQueryParams,
  parseTaskQueryParams,
} from './url-params';

describe('parseTaskQueryParams', () => {
  it('reads valid params from the URL', () => {
    const params = parseTaskQueryParams(
      new URLSearchParams('search=desk&status=in_progress&sortBy=title&order=asc')
    );

    expect(params).toEqual({
      search: 'desk',
      status: 'in_progress',
      sortBy: 'title',
      order: 'asc',
    });
  });

  it('falls back to initial values for invalid params', () => {
    const params = parseTaskQueryParams(
      new URLSearchParams('search=desk&status=invalid&sortBy=unknown&order=up')
    );

    expect(params).toEqual({
      ...INITIAL_TASK_QUERY_PARAMS,
      search: 'desk',
    });
  });
});

describe('createTaskQuerySearchParams', () => {
  it('omits default values and trims the search field', () => {
    const params = createTaskQuerySearchParams({
      search: '  desk  ',
      status: INITIAL_TASK_QUERY_PARAMS.status,
      sortBy: INITIAL_TASK_QUERY_PARAMS.sortBy,
      order: INITIAL_TASK_QUERY_PARAMS.order,
    });

    expect(params.toString()).toBe('search=desk');
  });

  it('keeps non-default filters in the URL', () => {
    const params = createTaskQuerySearchParams({
      search: 'desk',
      status: 'in_progress',
      sortBy: 'title',
      order: 'asc',
    });

    expect(params.toString()).toBe('search=desk&status=in_progress&sortBy=title&order=asc');
  });
});

describe('isSameTaskQueryParams', () => {
  it('returns true only for identical query params', () => {
    expect(
      isSameTaskQueryParams(
        {
          search: 'desk',
          status: 'in_progress',
          sortBy: 'title',
          order: 'asc',
        },
        {
          search: 'desk',
          status: 'in_progress',
          sortBy: 'title',
          order: 'asc',
        }
      )
    ).toBe(true);

    expect(
      isSameTaskQueryParams(
        {
          search: 'desk',
          status: 'in_progress',
          sortBy: 'title',
          order: 'asc',
        },
        {
          search: 'docs',
          status: 'in_progress',
          sortBy: 'title',
          order: 'asc',
        }
      )
    ).toBe(false);
  });
});
