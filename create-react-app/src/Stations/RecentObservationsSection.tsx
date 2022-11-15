import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getStationObservationsJsonLd } from "@vavassor/nws-client";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface RecentObservationsSectionProps {
  stationId: string | undefined;
}

export const RecentObservationsSection: FC<RecentObservationsSectionProps> = ({
  stationId,
}) => {
  const { data: observations } = useQuery(
    ["observations"],
    () => getStationObservationsJsonLd({ stationId: stationId! }),
    { enabled: !!stationId }
  );
  const { i18n, t } = useTranslation("station");

  const formattedObservations = useMemo(() => {
    if (!observations) {
      return undefined;
    }
    return observations["@graph"].map((observation) => {
      return {
        description: observation.textDescription,
        timestamp: observation.timestamp,
      };
    });
  }, [observations]);

  return (
    <Box as="section" borderRadius="lg" borderWidth="1px" py={4}>
      <Heading as="h2" px={8} size="lg">
        {t("recentObservationsSection.heading")}
      </Heading>
      {!!formattedObservations && formattedObservations.length > 0 && (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>{t("recentObservationsSection.timeTableHeader")}</Th>
                <Th>{t("recentObservationsSection.forecastTableHeader")}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {formattedObservations.map((observation) => (
                <Tr key={observation.timestamp}>
                  <Td>
                    {new Intl.DateTimeFormat(i18n.language, {
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    }).format(new Date(observation.timestamp))}
                  </Td>
                  <Td>{observation.description}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
