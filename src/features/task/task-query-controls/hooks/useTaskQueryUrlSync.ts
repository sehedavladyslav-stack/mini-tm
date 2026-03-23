import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import {
  createTaskQuerySearchParams,
  isSameTaskQueryParams,
  parseTaskQueryParams,
  useTaskQueryStore,
} from '../model';

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
      setSearchParams(nextSearchParams);
    }
  }, [params, searchParams, setSearchParams]);
}
