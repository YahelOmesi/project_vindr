import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CHANNELS } from '../../constants/common';
import { ListStyled, TitleStyled } from './style';
import { SavedQueries } from '../../types/filter';
import Query from '../query/Query';

const { DDSM_AGENT } = window;

export default function FavoritesQueriesView() {
  const [queries, setQueries] = React.useState<SavedQueries>([]);
  const navigate = useNavigate();

  const handleDelete = async (queryName: string) => {
    await DDSM_AGENT.send(CHANNELS.DELETE_QUERY, queryName);
  };

  const handleApply = async (queryName: string) => {
    const query = queries.find((query) => query.queryName === queryName);
    navigate(`/`, {
      state: {
        filters: query.filters,
      },
    });
  };

  useEffect(() => {
    const getQueries = async () => {
      const response: SavedQueries = await DDSM_AGENT.send(CHANNELS.LOAD_QUERIES);
      setQueries(response);
    };

    getQueries();
  }, [handleDelete]);

  const goToHome = () => {
    navigate(`/`);
  };

  return (
    <Box>
      <Button size="medium" onClick={goToHome}>
        <ArrowBack />
        Back
      </Button>
      <TitleStyled variant="h5">Favorites Queries View</TitleStyled>
      <ListStyled aria-labelledby="nested-list-subheader">
        {queries.map((query) => (
          <Query key={query?.queryName} {...query} handleDelete={handleDelete} handleApply={handleApply} />
        ))}
      </ListStyled>
    </Box>
  );
}
