using System;
using System.DirectoryServices;

namespace DerogationSystemWeb.Model.Services
{
    public static class AuxiliaryUtils
    {
        public static bool CheckLdapUser(string domainName, string username, string password)
        {
            bool success;

            using (DirectoryEntry adsEntry = new DirectoryEntry("LDAP://" + domainName, username, password))
            {
                using (DirectorySearcher adsSearcher = new DirectorySearcher(adsEntry))
                {
                    adsSearcher.Filter = "(sAMAccountName=" + username + ")";

                    try
                    {
                        SearchResult adsSearchResult = adsSearcher.FindOne();
                        success = true;
                    }
                    catch
                    {
                        success = false;
                    }
                    finally
                    {
                        adsEntry.Close();
                    }
                }
            }

            return success;
        }
    }
}