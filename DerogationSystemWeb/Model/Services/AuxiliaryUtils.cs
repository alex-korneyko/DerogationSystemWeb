using System;
using System.DirectoryServices;

namespace DerogationSystemWeb.Model.Services
{
    public static class AuxiliaryUtils
    {
        public static bool CheckLdapUser(string domainName, string username, string password)
        {
            bool success;

            using var adsEntry = new DirectoryEntry("LDAP://" + domainName, username, password);
            using var adsSearcher = new DirectorySearcher(adsEntry)
            {
                Filter = "(sAMAccountName=" + username + ")"
            };

            try
            {
                adsSearcher.FindOne();
                success = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                success = false;
            }
            finally
            {
                adsEntry.Close();
            }

            return success;
        }
    }
}