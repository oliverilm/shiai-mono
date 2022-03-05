import React from 'react';
import { Breadcrumbs, Divider, Link, Typography } from '@mui/material';
import { NavigateNextSharp } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface BreadcrumbsProps {
  link: string;
  title: string;
}

interface PageHeaderProps {
  crumbs?: BreadcrumbsProps[];
  title: string;
  actions?: React.FC | JSX.Element;
  secondaryTitle?: string;
}

const Row = styled('div')`
  padding-left: 2em;
  padding-top: 1em;
  padding-bottom: 0.5rem;
`;

const TitleRow = styled('div')`
  padding-top: 2em;
  padding-right: 2em;
  display: flex;
  justify-content: space-between;
`;

const Title = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 1em;
`;

const PageHeader: React.FC<PageHeaderProps> = ({
  crumbs = [],
  title,
  secondaryTitle,
  actions = () => <div />,
}) => (
  <>
    <Row>
      <Breadcrumbs separator={<NavigateNextSharp fontSize="small" />}>
        {[{ title: '.../', link: '/' }, ...crumbs].map((cr) => (
          <Link underline="hover" color="inherit" href={cr.link}>
            {cr.title}
          </Link>
        ))}
      </Breadcrumbs>

      <TitleRow>
        <Title>
          <Typography variant="h5">{title}</Typography>
          {secondaryTitle && (
            <Typography variant="h6" color="secondary">
              {secondaryTitle}
            </Typography>
          )}
        </Title>
        <Title className="actions">{actions}</Title>
      </TitleRow>
    </Row>
    <Divider />
  </>
);

export default PageHeader;
