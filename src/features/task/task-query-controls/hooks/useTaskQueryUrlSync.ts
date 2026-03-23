import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useTaskQueryStore } from '../model/task-query.store';
import {
  createTaskQuerySearchParams,
  isSameTaskQueryParams,
  parseTaskQueryParams,
} from '../model/url-params';

export function useTaskQueryUrlSync() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useTaskQueryStore(state => state.params);
  const setParams = useTaskQueryStore(state => state.setParams);

  useEffect(() => {
    const nextParams = parseTaskQueryParams(searchParams);
    const currentParams = useTaskQueryStore.getState().params;

    if (!isSameTaskQueryParams(nextParams, currentParams)) {
      setParams(nextParams);
    }
  }, [searchParams, setParams]);

  useEffect(() => {
    const nextSearchParams = createTaskQuerySearchParams(params);

    if (nextSearchParams.toString() !== searchParams.toString()) {
      setSearchParams(nextSearchParams, { replace: true });
    }
  }, [params, searchParams, setSearchParams]);
}
