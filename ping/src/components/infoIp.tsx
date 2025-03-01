import React, { useEffect, useState } from 'react';

interface IpInfo {
  ip: string;
  hostname: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
  readme: string;
}

const InfoIp: React.FC = () => {
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);

  useEffect(() => {
    fetch('https://ipinfo.io/json')
      .then(response => response.json())
      .then(data => setIpInfo(data))
      .catch(error => console.error('Error fetching IP info:', error));
  }, []);

  if (!ipInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p><strong>IP:</strong> {ipInfo.ip}</p>
      <p><strong>Hostname:</strong> {ipInfo.hostname}</p>
      <p><strong>City:</strong> {ipInfo.city}</p>
      <p><strong>Region:</strong> {ipInfo.region}</p>
      <p><strong>Country:</strong> {ipInfo.country}</p>
      <p><strong>Location:</strong> {ipInfo.loc}</p>
      <p><strong>Organization:</strong> {ipInfo.org}</p>
      <p><strong>Postal Code:</strong> {ipInfo.postal}</p>
      <p><strong>Timezone:</strong> {ipInfo.timezone}</p>
    </div>
  );
};

export default InfoIp;