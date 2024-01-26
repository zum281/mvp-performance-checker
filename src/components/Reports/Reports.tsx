import { FunctionComponent as FC } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { CrawlReport } from "./CrawlReport";
import { SitemapReport } from "./SitemapReport";
import { UrlListReport } from "./UrlListReport";

export const Reports: FC = () => {
	return (
		<section>
			<Tabs>
				<TabList>
					<Tab>Crawl Website</Tab>
					<Tab>Sitemap</Tab>
					<Tab>Url List</Tab>
				</TabList>
				<TabPanel>
					<CrawlReport />
				</TabPanel>
				<TabPanel>
					<SitemapReport />
				</TabPanel>
				<TabPanel>
					<UrlListReport />
				</TabPanel>
			</Tabs>
		</section>
	);
};
